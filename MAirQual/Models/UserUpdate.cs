using System.ComponentModel.DataAnnotations;

namespace MAirQual.Models
{
    public class UserUpdateModel
    {
        public string? NewUsername { get; set; }

        public string? NewEmail { get; set; }

        public string? NewPassword { get; set; }

        public string? CurrentPassword { get; set; }
    }
}
