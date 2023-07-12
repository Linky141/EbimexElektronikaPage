using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace API.ApiServices;

public class ImageService
{
       private readonly Cloudinary cloudinary;
        
        public ImageService(IConfiguration config)
        {
            var account = new Account(config["Cloudinary:CloudName"], config["Cloudinary:ApiKey"], config["Cloudinary:ApiSecret"]);            
        cloudinary = new Cloudinary(account);
        }

        public async Task<ImageUploadResult> AddImageAsync(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();
            if(file.Length > 0)
            {
                using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams{
                    File = new FileDescription(file.FileName, stream)
                };
                uploadResult = await cloudinary.UploadAsync(uploadParams);
            }
            return uploadResult;
        }

        public async Task<DeletionResult> DeleteImageAsync(string PublicId)
        {
            var deleteParams = new DeletionParams(PublicId);
            var result = await cloudinary.DestroyAsync(deleteParams);
            return result;
        }
}