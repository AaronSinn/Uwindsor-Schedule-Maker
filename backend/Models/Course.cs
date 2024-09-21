using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace backend.Models;

public class Course
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
    public ICollection<Section>? Sections { get; set; }//Collection of Labs and Lecs
}