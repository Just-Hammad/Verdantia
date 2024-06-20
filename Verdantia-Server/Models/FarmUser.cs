using System;
using System.Collections.Generic;

namespace Verdantia_Server.Models;

public partial class FarmUser
{
    public int? FarmId { get; set; }

    public int? UserId { get; set; }

    public virtual Farm? Farm { get; set; }

    public virtual User? User { get; set; }
}
