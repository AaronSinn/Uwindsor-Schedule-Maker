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

    [HttpGet("GetCourseById")]
    public Course? GetCourseById(int Id)
    {
        return _context.Courses
        .Include(course => course.Sections)
        .AsNoTracking()
        .SingleOrDefault(course => course.Id == Id);
    }

    [HttpGet("GetCourseByCode")]
    public List<Course>? GetCourseByCode(string code)
    {
        return _context.Courses
        .Where(course => course.Code == code)
        .Include(course => course.Sections)
        .AsNoTracking()
        .ToList();
    }

    [HttpGet("GetAllCourseCodes")]
    public IEnumerable<string> GetAllCourseCodes()
    {
        return _context.Courses
        .Select(course => course.Code)
        .ToList();
    }

    [HttpPost("CreateCourse")]
    public IActionResult CreateCourse(Course newCourse)
    {
        _context.Courses.Add(newCourse);
        _context.SaveChanges();

        return Ok(newCourse);
    }

    [HttpDelete("DeleteAllCourses")]
    public IActionResult DeleteAllCourses()
    {
         // Fetch all courses from the database
        var courses = _context.Courses
        .Include(course => course.Sections)
        .AsNoTracking()
        .ToList();

        // Check if there are courses to delete
        if (courses == null || courses.Count == 0)
        {
            return NotFound("No courses found to delete.");
        }

        _context.Courses.RemoveRange(courses);
        _context.SaveChanges();

        return NoContent();
    }
}
