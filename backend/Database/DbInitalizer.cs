using backend.Models;

namespace backend.Database
{
    public static class DbInitializer
    {
        public static void Initialize(DatabaseContext context)
        {

            if (context.Courses.Any()
                && context.Events.Any()
                && context.Sections.Any())
            {
                return;   // DB has been seeded
            }

            return;

            // var section1_1400 = new Section { Title = "Section 1", Type = "LEC", Days = ["M", "W"], StartTime = "01:00 PM", EndTime = "02:20 PM", Location = "Toldo 102" };
            // var section2_1400 = new Section { Title = "Section 2", Type = "LEC", Days = ["T", "TH"], StartTime = "05:30 PM", EndTime = "06:50 PM", Location = "Toldo 102" };
            // var section51_1400 = new Section { Title = "Section 51", Type = "LAB", Days = ["T"], StartTime = "04:00 PM", EndTime = "05:20 PM", Location = "Erie 2213" };
            // var section52_1400 = new Section { Title = "Section 52", Type = "LAB", Days = ["TH"], StartTime = "04:00 PM", EndTime = "05:20 PM", Location = "Erie 2213" };

            // var section1_2660 = new Section { Title = "Section 1", Type = "LEC", Days = ["M", "W"], StartTime = "05:00 PM", EndTime = "05:20 PM", Location = "Odette 100" };
            // var section51_2660 = new Section { Title = "Section 51", Type = "LAB", Days = ["M"], StartTime = "11:30 PM", EndTime = "12:50 PM", Location = "Erie 1234" };
            // var section55_2660 = new Section { Title = "Section 51", Type = "LAB", Days = ["T"], StartTime = "07:00 PM", EndTime = "08:20 PM", Location = "Erie 1234" };

            // var courses = new Course[]
            // {
            //     new Course
            //         {
            //             Title = "Intro: Algorithms & Prog 1",
            //             Code = "COMP-1400",
            //             Sections = new List<Section>
            //             {
            //                 section1_1400,
            //                 section2_1400,
            //                 section51_1400,
            //                 section52_1400
            //             }
            //         },
            //     new Course
            //         {
            //             Title = "Comp Architre II:Micro Program",
            //             Code = "COMP-2660",
            //             Sections = new List<Section>
            //             {
            //                 section1_2660,
            //                 section51_2660,
            //                 section55_2660
            //             }
            //         },
            // };

            // var officeHours = new Event { Title = "TA Office Hours", Days = ["F"], StartTime = "01:00 PM", EndTime = "02:20 PM", Location = "Erie 3150" };

            // context.Events.Add(officeHours);
            // context.Courses.AddRange(courses);
            // context.SaveChanges();
        }
    }
}