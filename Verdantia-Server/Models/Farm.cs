using System;
using System.Collections.Generic;

namespace Verdantia_Server.Models;

public partial class Farm
{
    public int FarmId { get; set; }

    public string? FarmName { get; set; }

    public string? Location { get; set; }

    public int? Longitude { get; set; }

    public int? Latitude { get; set; }
}
