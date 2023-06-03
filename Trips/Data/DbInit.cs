using System;
using Trips.Models;
namespace Trips.Data
{
	public class DbInit
	{
        public static void Initialize(ApplicationDbContext db)
        {
            if (db.Trips.Any())
            {
                return;
            }

            var tripsList = new[]
                    {
                new Trip { Id = 1, Name = "Vienna, Austria", Description = "Vienna, one of the most beautiful places in Austria.", DateStarted = new DateTime(2017, 01, 12), DateCompleted = null },
                new Trip { Id = 2, Name = "Santorini, Greece", Description = "Santorini, a stunning island in Greece known for its breathtaking sunsets and whitewashed buildings.", DateStarted = new DateTime(2017, 01, 12), DateCompleted = null },
                new Trip { Id = 3, Name = "Machu Picchu, Peru", Description = "Machu Picchu, an ancient Inca citadel nestled in the Andes Mountains of Peru.", DateStarted = new DateTime(2017, 01, 12), DateCompleted = null },
                new Trip { Id = 4, Name = "Tokyo, Japan", Description = "Tokyo, the bustling capital city of Japan, known for its modern technology, vibrant culture, and delicious cuisine.", DateStarted = new DateTime(2017, 01, 12), DateCompleted = new DateTime(2017, 01, 20) },
                new Trip { Id = 5, Name = "Paris, France", Description = "Paris, the romantic city of France, famous for its iconic landmarks such as the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral.", DateStarted = new DateTime(2017, 01, 12), DateCompleted = new DateTime(2017, 01, 18) },
                };

            foreach (var trip in tripsList)
            {
                db.Trips.Add(trip);
            }

            db.SaveChanges();
        }
    }
}

