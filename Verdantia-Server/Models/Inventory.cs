using System;
using System.Collections.Generic;

namespace Verdantia_Server.Models;

public partial class Inventory
{
    public string? InventoryId { get; set; }

    public int? FarmId { get; set; }

    public decimal? Quantity { get; set; }
}
