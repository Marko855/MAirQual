using System;
using MAirQual.Models;

namespace MAirQual.Services
{
    public class UserService
    {
        private readonly List<User> _users;

        public UserService()
        {
            // Initialize an empty list of users
            _users = new List<User>();
        }

        public async Task RegisterUser(string email, string password)
        {
            // Check if user with the same email already exists
            if (_users.Any(u => u.Email == email))
            {
                throw new Exception("User with the same email already exists.");
            }

            var user = new User
            {
                Email = email,
                Password = password
            };

            // Add the new user to the list
            Console.WriteLine("User added successfully on backend.");
            _users.Add(user);
        }

        public List<User> GetUsers()
        {
            // Return the list of users
            return _users;
        }
    }
}