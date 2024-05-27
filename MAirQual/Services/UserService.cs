using MAirQual.Data;
using MAirQual.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MAirQual.Services
{
    public class UserService
    {
        private readonly ApplicationDbContext _context;
        

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        public class AuthResponse
        {
            public bool Success { get; set; }
            public string Message { get; set; }
            public User User { get; set; }
        }


        public bool UserExists(string email)
        {
            return _context.Users.Any(u => u.Email == email);
        }

        public void RegisterUser(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public List<User> GetAllUsers()
        {
            return _context.Users.ToList();
        }

        public User Authenticate(string email, string password)
        {

            var user = _context.Users.SingleOrDefault(u => u.Email == email && u.Password == password);

            if (user == null)
            {
                return null;
            }

            return user;
        }


        public User GetUserByEmail(string email)
        {
            return _context.Users
                .Include(u => u.FavoriteLocations)
                .SingleOrDefault(u => u.Email == email);
        }

        // Method to get favorite locations for a user
        public List<string> GetFavorites(int userId)
        {
            // Retrieve all favorite locations for the given userId
            var favoriteLocations = _context.FavoriteLocations
                .Where(fl => fl.UserId == userId)
                .Select(fl => fl.Location)
                .ToList();

            return favoriteLocations;
        }
        public bool FavoriteLocationExists(int userId, string location)
        {
            return _context.FavoriteLocations.Any(fl => fl.UserId == userId && fl.Location == location);
        }
        public void AddFavoriteLocation(int userId, string location)
        {
            var user = _context.Users.Find(userId);
            if (user != null)
            {
                // Create a new FavoriteLocation object
                var favoriteLocation = new FavoriteLocation { Location = location };

                // Add the new favorite location to the user's collection
                user.FavoriteLocations.Add(favoriteLocation);

                // Save changes to the database
                _context.SaveChanges();
            }
        }

        public void DeleteFavoriteLocation(int userId, int index)
        {
            var user = _context.Users.Find(userId);
            if (user != null && index >= 0 && index < user.FavoriteLocations.Count)
            {
                // Remove the favorite location at the specified index
                var favoriteLocationToRemove = user.FavoriteLocations.ElementAt(index);
                user.FavoriteLocations.Remove(favoriteLocationToRemove);

                // Save changes to the database
                _context.SaveChanges();
            }
        }

        public async Task<AuthResponse> UpdateUser(User user, UserUpdateModel model)
        {
            try
            {
                // Verify the current password
                if (user.Password != model.CurrentPassword)
                {
                    // If the current password doesn't match, return false
                    return new AuthResponse { Success = false, Message = "Current password is incorrect" };
                }

                // Check if the new email is different from the current email
                if (!string.IsNullOrEmpty(model.NewEmail) && model.NewEmail != user.Email)
                {
                    // Check if another user already exists with the new email
                    if (UserExists(model.NewEmail))
                    {
                        // If another user with the new email already exists, return a custom message
                        return new AuthResponse { Success = false, Message = "User with the same email already exists" };
                    }

                    // Update the user's email
                    user.Email = model.NewEmail;
                }

                // Update the user's information based on the provided model
                if (!string.IsNullOrEmpty(model.NewUsername))
                {
                    user.Username = model.NewUsername;
                }

                if (!string.IsNullOrEmpty(model.NewPassword))
                {
                    user.Password = model.NewPassword;
                }

                // Save changes to the database
                await _context.SaveChangesAsync();

                // Return true to indicate a successful update
                return new AuthResponse { Success = true, Message = "User profile updated successfully" };
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                Console.WriteLine($"Error updating user: {ex.Message}");
                return new AuthResponse { Success = false, Message = "An error occurred while updating user profile" };
            }
        }


    }
}
