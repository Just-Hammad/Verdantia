using System;
using System.Collections.Generic;

namespace Verdantia_Server.Models;

public partial class Task
{
    public int TaskId { get; set; }

    public string? TreeId { get; set; }

    public string? Task1 { get; set; }

    public int? UserId { get; set; }

    public DateTime? Scheduled { get; set; }
}
