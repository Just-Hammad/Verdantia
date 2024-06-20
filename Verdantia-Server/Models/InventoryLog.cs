using System;
using System.Collections.Generic;

namespace Verdantia_Server.Models;

public partial class InventoryLog
{
    public string? InventoryId { get; set; }

    public decimal? OldQuantity { get; set; }

    public decimal? NewQuantity { get; set; }

    public int? UserId { get; set; }

    public DateTime? UpdateTime { get; set; }
}
