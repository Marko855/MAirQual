using System;
using System.ComponentModel.DataAnnotations;

namespace MAirQual.Models
{
	public class User
	{
        [Key]
        public int Id { get; set; }

        [Required]
        public string? Email { get; set; }

        [Required]
        public string? Password { get; set; }
    }
}

