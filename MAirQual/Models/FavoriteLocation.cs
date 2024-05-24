using System;
using System.ComponentModel.DataAnnotations;

namespace MAirQual.Models
{
    public class FavoriteLocation
    {
        [Key]
        public int Id { get; set; }

        public string Location { get; set; }

        public int UserId { get; set; }

        // Add any other properties as needed
    }
}

