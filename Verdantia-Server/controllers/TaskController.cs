using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Verdantia_Server.Models;

namespace Verdantia_Server.controllers;

[ApiController]
[Route("/Tasks")]
public class TasksController( VerdantiaContext context): ControllerBase
{
    [HttpGet]
    public async Task<List<Models.Task>> GetAllTasks()
    {
        return await context.Tasks.ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult> insertTask([FromBody] Models.Task task)
    {
        context.Tasks.Add(task);
        await context.SaveChangesAsync();
        return Ok("Task added successfully");
    }

    [HttpPut]
    public async Task<ActionResult> updateTask([FromBody] Models.Task task)
    {
        var oldTask = context.Tasks.Find(task.TaskId);
        if(oldTask == null){
            return NotFound("Task not found");
        }
        oldTask.TreeId = task.TreeId;
        oldTask.Task1 = task.Task1;
        oldTask.UserId = task.UserId;
        oldTask.Scheduled = task.Scheduled;

        await context.SaveChangesAsync();
        return Ok("Task updated successfully");
    }

    [HttpDelete]
    public async Task<ActionResult> deleteTask(Models.Task task)
    {
        int taskId = task.TaskId;
        var taskToDelete = context.Tasks.Find(taskId);
        if(taskToDelete == null){
            return NotFound("Task not found");
        }
        context.Tasks.Remove(taskToDelete);
        await context.SaveChangesAsync();
        return Ok("Task completed.");
    }
}

// public partial class Task
// {
//     public int TaskId { get; set; }

//     public string? TreeId { get; set; }

//     public string? Task1 { get; set; }

//     public int? UserId { get; set; }

//     public DateTime? Scheduled { get; set; }
// }
