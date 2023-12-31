namespace API.ApiServices;

public static class Base64Service
{
    public static IFormFile Base64ToImage(string image)
    {
        int index = image.IndexOf("base64") + 7;
        if (index != -1)
            image = image.Substring(index);

        byte[] bytes = Convert.FromBase64String(image);
        MemoryStream stream = new MemoryStream(bytes);
        IFormFile file = new FormFile(stream, 0, bytes.Length, "PIC", "PIC");
        return file;
    }
}