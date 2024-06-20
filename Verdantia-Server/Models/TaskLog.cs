using System;
using System.Collections.Generic;

namespace Verdantia_Server.Models;

public partial class TaskLog
{
    public int TaskId { get; set; }

    public string? TreeId { get; set; }

    public string? Task { get; set; }

    public int? UserId { get; set; }

    public DateTime? Scheduled { get; set; }

    public DateTime? Creation { get; set; }

    public DateTime? Deletion { get; set; }

    public string? TaskStatus { get; set; }
}
