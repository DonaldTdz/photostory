using System.ComponentModel.DataAnnotations;

namespace photostory.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}