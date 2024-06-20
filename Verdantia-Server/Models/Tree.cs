using System;
using System.Collections.Generic;

namespace Verdantia_Server.Models;

public partial class Tree
{
    public string TreeId { get; set; } = null!;

    public int Tcolumn { get; set; }

    public int Trow { get; set; }

    public int? FarmId { get; set; }

    public int? TypeId { get; set; }

    public int? Age { get; set; }

    public DateTime? LastWatered { get; set; }

    public DateTime? LastFertilized { get; set; }

    public DateTime? LastPesticide { get; set; }
}
