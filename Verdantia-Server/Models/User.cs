using System;
using System.Collections.Generic;

namespace Verdantia_Server.Models;

public partial class User
{
    public int UserId { get; set; }

    public int? UserTypeId { get; set; }

    public string? UserName { get; set; }

    public string? UName { get; set; }

    public string? UPassword { get; set; }

    public string? Email { get; set; }

    public string? Phone { get; set; }

    public virtual Usertype? UserType { get; set; }
}
