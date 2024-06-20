using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Verdantia_Server.Models;

namespace Verdantia_Server.controllers;

[ApiController]
[Route("/[controller]")]

public class TaskLogsController(VerdantiaContext context): ControllerBase
{
    [HttpGet]
    public async Task<List<TaskLog>> GetAllTaskLogs()
    {
        return await context.TaskLogs.ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult> insertTaskLog([FromBody] TaskLog taskLog)
    {
        context.TaskLogs.Add(taskLog);
        await context.SaveChangesAsync();
        return Ok("TaskLog added successfully");
    }

    [HttpPut]
    public async Task<ActionResult> updateTaskLog([FromBody] TaskLog taskLog)
    {
        var oldTaskLog = context.TaskLogs.Find(taskLog.TaskId);
        if(oldTaskLog == null){
            return NotFound("TaskLog not found");
        }
        oldTaskLog.TaskId = taskLog.TaskId;
        oldTaskLog.TreeId = taskLog.TreeId;
        oldTaskLog.Task = taskLog.Task;
        oldTaskLog.UserId = taskLog.UserId;
        oldTaskLog.Scheduled = taskLog.Scheduled;
        oldTaskLog.Creation = taskLog.Creation;
        oldTaskLog.Deletion = taskLog.Deletion;
        context.TaskLogs.Update(oldTaskLog);

        await context.SaveChangesAsync();
        return Ok("TaskLog updated successfully");
    }
} 

// public partial class TaskLog
// {
//     public int TaskId { get; set; }

//     public string? TreeId { get; set; }

//     public string? Task { get; set; }

//     public int? UserId { get; set; }

//     public DateTime? Scheduled { get; set; }

//     public DateTime? Creation { get; set; }

//     public DateTime? MarkedDone { get; set; }
// }
