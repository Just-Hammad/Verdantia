using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Verdantia_Server.Models;

namespace Verdantia_Server.controllers;


[ApiController]
[Route("/[controller]")]
public class TreesController( VerdantiaContext context): ControllerBase
{
    [HttpGet]
    public async Task<List<Tree>> GetAllTrees()
    {
        return await context.Trees.ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult> insertTree([FromBody] Tree tree)
    {
        context.Trees.Add(tree);
        await context.SaveChangesAsync();
        return Ok("Tree added successfully");
    }
}