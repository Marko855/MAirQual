﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MAirQual.Models
{
    public class User
    {
        public User()
        {
            FavoriteLocations = new List<FavoriteLocation>();
        }

        [Key]
        public int Id { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        public ICollection<FavoriteLocation> FavoriteLocations { get; set; }
    }
}
