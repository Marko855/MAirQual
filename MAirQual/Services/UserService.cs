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

        public List<string> GetFavorites(int userId)
        {
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
                var favoriteLocation = new FavoriteLocation { Location = location };

                user.FavoriteLocations.Add(favoriteLocation);

                _context.SaveChanges();
            }
        }

        public void DeleteFavoriteLocation(int userId, int index)
        {
            var user = _context.Users.Find(userId);
            if (user != null && index >= 0 && index < user.FavoriteLocations.Count)
            {
                var favoriteLocationToRemove = user.FavoriteLocations.ElementAt(index);
                user.FavoriteLocations.Remove(favoriteLocationToRemove);

                
                _context.SaveChanges();
            }
        }

        public async Task<AuthResponse> UpdateUser(User user, UserUpdateModel model)
        {
            try
            {
                if (user.Password != model.CurrentPassword)
                {
                    return new AuthResponse { Success = false, Message = "Current password is incorrect" };
                }

                if (!string.IsNullOrEmpty(model.NewEmail) && model.NewEmail != user.Email)
                {
                    if (UserExists(model.NewEmail))
                    {
                        return new AuthResponse { Success = false, Message = "User with the same email already exists" };
                    }

                    user.Email = model.NewEmail;
                }

                if (!string.IsNullOrEmpty(model.NewUsername))
                {
                    user.Username = model.NewUsername;
                }

                if (!string.IsNullOrEmpty(model.NewPassword))
                {
                    user.Password = model.NewPassword;
                }

                await _context.SaveChangesAsync();

                return new AuthResponse { Success = true, Message = "User profile updated successfully" };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating user: {ex.Message}");
                return new AuthResponse { Success = false, Message = "An error occurred while updating user profile" };
            }
        }


    }
}
