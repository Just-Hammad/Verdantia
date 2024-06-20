using System;
using System.Collections.Generic;

namespace Verdantia_Server.Models;

public partial class UserLog
{
    public int? UserId { get; set; }

    public int? UserTypeId { get; set; }

    public string? UserName { get; set; }

    public string? UName { get; set; }

    public string? Email { get; set; }

    public string? Phone { get; set; }

    public string? UpdatedBy { get; set; }

    public DateTime? Updated { get; set; }

    public string? Act { get; set; }

    public int LogId { get; set; }
}
