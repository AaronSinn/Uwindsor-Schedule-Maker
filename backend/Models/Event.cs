using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace backend.Models;
public class Event
{
    public int Id { get; set; }
    [MaxLength(30)]
    public string Title { get; set; } = string.Empty;
    public string[] Days { get; set; } = [];
    public string StartTime { get; set; } = string.Empty; //SQLite can.t store DateTime
    public string EndTime { get; set; } = string.Empty; //SQLite can.t store DateTime    
    [MaxLength(30)]
    public string Location { get; set; } = string.Empty;
}
