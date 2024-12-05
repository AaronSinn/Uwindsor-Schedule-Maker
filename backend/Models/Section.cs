using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace backend.Models;

public class Section
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string[] Days { get; set; } = [];
    public string StartTime { get; set; } = string.Empty; //SQLite can.t store DateTime
    public string EndTime { get; set; } = string.Empty; //SQLite can.t store DateTime
    public string Location { get; set; } = string.Empty;
    public string Room { get; set; } = string.Empty;
    public string Professor { get; set; } = string.Empty;
    [JsonIgnore]
    public Course? Course { get; set; } //Reference to the course the Lec/Lab is in. Null for custom events.
}
