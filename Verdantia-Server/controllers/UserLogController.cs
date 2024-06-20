using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Verdantia_Server.Models;

namespace Verdantia_Server.controllers;

[ApiController]
[Route("/[controller]")]

public class UserLogsController(VerdantiaContext context): ControllerBase
{
    [HttpGet]
    public async Task<List<UserLog>> GetAllUserLogs()
    {
        return await context.UserLogs.ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult> insertUserLog([FromBody] UserLog userLog)
    {
        context.UserLogs.Add(userLog);
        await context.SaveChangesAsync();
        return Ok("UserLog added successfully");
    }

    [HttpPut]
    public async Task<ActionResult> updateUserLog([FromBody] UserLog userLog)
    {
        var oldUserLog = context.UserLogs.Find(userLog.LogId);
        if(oldUserLog == null){
            return NotFound("UserLog not found");
        }
        oldUserLog.UserId = userLog.UserId;
        oldUserLog.UserTypeId = userLog.UserTypeId;
        oldUserLog.UserName = userLog.UserName;
        oldUserLog.Email = userLog.Email;
        oldUserLog.Phone = userLog.Phone;
        oldUserLog.UpdatedBy = userLog.UpdatedBy;
        oldUserLog.Updated = userLog.Updated;
        context.UserLogs.Update(oldUserLog);

        await context.SaveChangesAsync();
        return Ok("UserLog updated successfully");
    }
} 