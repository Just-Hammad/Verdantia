using System;
using System.Collections.Generic;

namespace Verdantia_Server.Models;

public partial class Usertype
{
    public int UserTypeId { get; set; }

    public string? UserType1 { get; set; }

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
