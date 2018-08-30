using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AngularSample.Web.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private readonly string _repoPath = "productRepository.txt";

        public ProductController()
        {
            if (!System.IO.File.Exists(_repoPath))
            {
                System.IO.File.Create(_repoPath);
            }
        }

        [Route("products")]
        public Task<Product[]> Products()
        {
            var products =
                System.IO.File.ReadAllLines(_repoPath)
                    .Select(line => JsonConvert.DeserializeObject<Product>(line))
                    .ToArray();

            return Task.FromResult(products);
        }

        [Route("add")]
        [HttpPost]
        public Task Add(Product product)
        {
            System.IO.File.AppendAllLines(_repoPath, new[] {JsonConvert.SerializeObject(product)});

            return Task.CompletedTask;
        }
    }

    public class Product
    {
        public string Name { get; set; }

        public decimal UnitPrice { get; set; }
    }
}