using System;
using System.Collections.Generic;

namespace Verdantia_Server.Models;

public partial class Fertilizer
{
    public string FertilizerId { get; set; } = null!;

    public string? Fname { get; set; }

    public virtual ICollection<Plantinfo> Plantinfos { get; set; } = new List<Plantinfo>();
}
