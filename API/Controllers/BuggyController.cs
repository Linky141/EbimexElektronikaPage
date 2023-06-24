namespace API.Controllers;

public class BuggyController : BaseApiController
{
    [HttpGet("not-found")]
    public ActionResult GetNotFound()
    {
        return NotFound();
    }

    [HttpGet("bad-request")]
    public ActionResult GetBadRequest()
    {
        return BadRequest(new ProblemDetails { Title = "This is bad request" });
    }

    [HttpGet("unauthorized")]
    public ActionResult GetUnauthorized()
    {
        return Unauthorized();
    }

    [HttpGet("validation-error")]
    public ActionResult GetValidationError()
    {
        ModelState.AddModelError("Problem 1", "Error 1");
        ModelState.AddModelError("Problem 2", "Error 2");
        ModelState.AddModelError("Problem 3", "Error 3");
        return ValidationProblem();
    }

    [HttpGet("server-error")]
    public ActionResult GetServerError()
    {
        throw new Exception("this is server error");
    }
}