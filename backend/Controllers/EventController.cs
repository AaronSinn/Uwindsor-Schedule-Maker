using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Database;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventController : ControllerBase
{
    private readonly DatabaseContext _context;
    public EventController(DatabaseContext context)
    {
        _context = context;
    }

    [HttpGet("GetAllEvents")]
    public IEnumerable<Event> GetAllEvents()
    {
        return _context.Events.AsNoTracking().ToList();
    }

    [HttpGet("GetEventByID")]
    public Event? GetEventByID(int id)
    {
        return _context.Events
        .AsNoTracking()
        .SingleOrDefault(e => e.Id == id);
    }

    [HttpPost("CreateEvent")]
    public IActionResult Create(Event newEvent)
    {
        _context.Events.Add(newEvent);
        _context.SaveChanges();

        return Ok(newEvent);
    }
}