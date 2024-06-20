using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Verdantia_Server.Models;

namespace Verdantia_Server.controllers;

[ApiController]
[Route("/[controller]")]

public class FarmController (VerdantiaContext context): ControllerBase
{
    [HttpGet]
    public async Task<List<Farm>> GetAllFarms()
    {
        return await context.Farms.ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult> insertFarm([FromBody] Farm farm)
    {
        context.Farms.Add(farm);
        await context.SaveChangesAsync();
        return Ok("Farm added successfully");
    }

    [HttpPut]
    public async Task<ActionResult> updateFarm([FromBody] Farm farm)
    {
        var oldFarm = context.Farms.Find(farm.FarmId);
        if(oldFarm == null){
            return NotFound("Farm not found");
        }
        oldFarm.FarmId = farm.FarmId;
        oldFarm.FarmName = farm.FarmName;
        oldFarm.Location = farm.Location;
        oldFarm.Longitude = farm.Longitude;
        oldFarm.Latitude = farm.Latitude;
        context.Farms.Update(oldFarm);

        await context.SaveChangesAsync();
        return Ok("Farm updated successfully");
    }
}

// public partial class Farm
// {
//     public int FarmId { get; set; }

//     public string? FarmName { get; set; }

//     public string? Location { get; set; }

//     public int? Longitude { get; set; }

//     public int? Latitude { get; set; }
// }
