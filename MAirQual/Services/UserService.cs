using MAirQual.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MAirQual.Services
{
    public class UserService
    {
        private readonly List<User> _users = new List<User>();

        public bool UserExists(string email)
        {
            return _users.Any(u => u.Email == email);
        }

        public void RegisterUser(User user)
        {
            _users.Add(user);
        }

        public List<User> GetAllUsers()
        {
            return _users;
        }

        public User Authenticate(string email, string password)
        {
            return _users.SingleOrDefault(u => u.Email == email && u.Password == password);
        }
    }
}
