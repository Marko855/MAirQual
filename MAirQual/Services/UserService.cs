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
            return _context.Users.SingleOrDefault(u => u.Email == email && u.Password == password);
        }

        public User GetUserByEmail(string email)
        {
            return _context.Users
                .Include(u => u.FavoriteLocations) // Include FavoriteLocations
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
            Console.WriteLine("Prije petlje");
            if (user != null && index >= 0 && index < user.FavoriteLocations.Count)
            {
                Console.WriteLine("Unutra sam");
                // Remove the favorite location at the specified index
                var favoriteLocationToRemove = user.FavoriteLocations.ElementAt(index);
                user.FavoriteLocations.Remove(favoriteLocationToRemove);

                // Save changes to the database
                _context.SaveChanges();
            }
        }
    }
}
