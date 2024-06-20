using System;
using System.Collections.Generic;

namespace Verdantia_Server.Models;

public partial class Farmer
{
    public int FarmerId { get; set; }

    public string? FuserName { get; set; }

    public string? Fname { get; set; }

    public string? Fpassword { get; set; }

    public string? Femail { get; set; }

    public string? Fphone { get; set; }
}
