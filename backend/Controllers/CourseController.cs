using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Database;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CourseController : ControllerBase
{
    private readonly DatabaseContext _context;
    public CourseController(DatabaseContext context)
    {
        _context = context;
    }

    [HttpGet("GetAllCourses")]
    public IEnumerable<Course> GetAllCourses()
    {
        //return _context.Courses.AsNoTracking().ToList();
        return _context.Courses
        .Include(course => course.Sections)
        .AsNoTracking()
        .ToList();
    }

    [HttpGet("GetCourseByID")]
    public Course? GetCourseById(int id)
    {
        return _context.Courses
        .Include(course => course.Sections)
        .AsNoTracking()
        .SingleOrDefault(course => course.Id == id);
    }


    [HttpPost("CreateCourse")]
    public IActionResult CreateCourse(Course newCourse)
    {
        _context.Courses.Add(newCourse);
        _context.SaveChanges();

        return Ok(newCourse);
    }
}