using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Verdantia_Server.Models;

namespace Verdantia_Server.controllers;

[ApiController]
[Route("/[controller]")]
public class UsersController(VerdantiaContext context) : ControllerBase
{
    [HttpGet]
    public async Task<List<User>> GetAllUsers()
    {
        return await context.Users.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<string>> GetUserName(int id)
    {
        var user = await context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound("User not found");
        }
        return (user.UName != null) ? user.UName : "User not found";
    }


    [HttpPost]
    public async Task<ActionResult> insertUser([FromBody] User user)
    {
        context.Users.Add(user);
        await context.SaveChangesAsync();
        return Ok("User added successfully");
    }

    [HttpPut]
    public async Task<ActionResult> updateUser([FromBody] User user)
    {
        var oldUser = context.Users.Find(user.UserId);
        if (oldUser == null)
        {
            return NotFound("User not found");
        }
        oldUser.UserId = user.UserId;
        oldUser.UserTypeId = user.UserTypeId;
        oldUser.UserName = user.UserName;
        oldUser.UName = user.UName;
        oldUser.UPassword = user.UPassword;
        oldUser.Email = user.Email;
        oldUser.Phone = user.Phone;
        context.Users.Update(oldUser);

        await context.SaveChangesAsync();
        return Ok("User updated successfully");
    }


    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest loginRequest)
    {
        var user = context.Users.FirstOrDefault(u => u.UserName == loginRequest.UserName);

        if (user == null || user.UPassword != loginRequest.UPassword)
        {
            return Unauthorized(new { message = "Invalid username or password" });
        }

        // Generate and return a token (skipping for simplicity)
        return Ok(new
        {
            message = "Login successful",
            UserId = user.UserId,
            UserName = user.UserName,
            UName = user.UName,
            UsertypeID = user.UserTypeId
        });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest registerRequest)
    {
        var userExists = context.Users.Any(u => u.UserName == registerRequest.UserName);
        if (userExists)
        {
            return BadRequest(new { message = "Username already taken" });
        }

        var user = new User
        {
            UserName = registerRequest.UserName,
            UPassword = registerRequest.UPassword // Note: Hash password in a real application
        };

        context.Users.Add(user);
        await context.SaveChangesAsync();

        return Ok(new { message = "Registration successful" });
    }

    [HttpDelete]
    public async Task<ActionResult> deleteUser(User user)
    {
        int userId = user.UserId;
        var userToDelete = context.Users.Find(userId);
        if (userToDelete == null)
        {
            return NotFound("User not found");
        }
        context.Users.Remove(userToDelete);
        await context.SaveChangesAsync();
        return Ok("User deleted successfully");
    }

    public class DeleteRequest
    {
        public required int userId { get; set; }
        public required string uName { get; set; }
        public required string userName { get; set; }
        public required string uPassword { get; set; }
        public required int userTypeID { get; set; }
        public required string email { get; set; }
        public required string phone { get; set; }
        public required string userType {get; set; }
    }
    public class LoginRequest
    {
        public required string UserName { get; set; }
        public required string UPassword { get; set; }
    }

    public class RegisterRequest
    {
        public required string UserName { get; set; }
        public required string UPassword { get; set; }
    }
}