using YourProjectName.Models;

namespace YourProjectName.Repositories;

public interface ICountryRepository
{
    Task<IEnumerable<Country>> GetAllAsync();
    Task<Country?> GetByIdAsync(int id);
    Task<Country> CreateAsync(Country country);
    Task<Country?> UpdateAsync(Country country);
    Task<bool> DeleteAsync(int id);
}