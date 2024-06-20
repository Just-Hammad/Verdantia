using System;
using System.Collections.Generic;

namespace Verdantia_Server.Models;

public partial class Pesticide
{
    public string PesticideId { get; set; } = null!;

    public string? Pname { get; set; }

    public virtual ICollection<Plantinfo> Plantinfos { get; set; } = new List<Plantinfo>();
}
