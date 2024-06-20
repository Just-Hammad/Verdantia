using System;
using System.Collections.Generic;

namespace Verdantia_Server.Models;

public partial class Plantinfo
{
    public int PlantId { get; set; }

    public string? Pname { get; set; }

    public int? GrowthRate { get; set; }

    public string? FertilizerId { get; set; }

    public int? Fduration { get; set; }

    public int? Famount { get; set; }

    public string? PesticideId { get; set; }

    public int? Pduartion { get; set; }

    public int? Pamount { get; set; }

    public decimal? Irrigation { get; set; }

    public int? Iduration { get; set; }

    public virtual Fertilizer? Fertilizer { get; set; }

    public virtual Pesticide? Pesticide { get; set; }
}
