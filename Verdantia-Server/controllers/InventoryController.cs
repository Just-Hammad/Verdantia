using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Verdantia_Server.Models;

namespace Verdantia_Server.controllers;

[ApiController]
[Route("/[controller]")]

public class InventoryController (VerdantiaContext context): ControllerBase
{
    [HttpGet]
    public async Task<List<Inventory>> GetAllInventories()
    {
        return await context.Inventories.ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult> insertInventory([FromBody] Inventory inventory)
    {
        context.Inventories.Add(inventory);
        await context.SaveChangesAsync();
        return Ok("Inventory added successfully");
    }

    [HttpPut]
    public async Task<ActionResult> updateInventory([FromBody] Inventory inventory)
    {
        var oldInventory = context.Inventories.Find(inventory.InventoryId);
        if(oldInventory == null){
            return NotFound("Inventory not found");
        }
        oldInventory.InventoryId = inventory.InventoryId;
        oldInventory.FarmId = inventory.FarmId;
        oldInventory.Quantity = inventory.Quantity;
        context.Inventories.Update(oldInventory);

        await context.SaveChangesAsync();
        return Ok("Inventory updated successfully");

    }
}

// public partial class Inventory
// {
//     public string? InventoryId { get; set; }

//     public int? FarmId { get; set; }

//     public decimal? Quantity { get; set; }
// }
