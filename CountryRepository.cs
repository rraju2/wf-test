using YourProjectName.Models;

namespace YourProjectName.Repositories;

public class CountryRepository : ICountryRepository
{
    // In-memory store for demonstration purposes
    private readonly List<Country> _countries =
    [
        new() { Id = 1, Name = "United States", IsoCode = "USA" },
        new() { Id = 2, Name = "Canada", IsoCode = "CAN" },
        new() { Id = 3, Name = "United Kingdom", IsoCode = "GBR" }
    ];
    private int _nextId = 4;

    public Task<IEnumerable<Country>> GetAllAsync()
    {
        return Task.FromResult<IEnumerable<Country>>(_countries);
    }

    public Task<Country?> GetByIdAsync(int id)
    {
        var country = _countries.FirstOrDefault(c => c.Id == id);
        return Task.FromResult(country);
    }

    public Task<Country> CreateAsync(Country country)
    {
        country.Id = _nextId++;
        _countries.Add(country);
        return Task.FromResult(country);
    }

    public Task<Country?> UpdateAsync(Country country)
    {
        var existingCountry = _countries.FirstOrDefault(c => c.Id == country.Id);
        if (existingCountry == null)
        {
            return Task.FromResult<Country?>(null);
        }

        existingCountry.Name = country.Name;
        existingCountry.IsoCode = country.IsoCode;
        return Task.FromResult<Country?>(existingCountry);
    }

    public Task<bool> DeleteAsync(int id)
    {
        var countryToRemove = _countries.FirstOrDefault(c => c.Id == id);
        if (countryToRemove == null)
        {
            return Task.FromResult(false);
        }

        return Task.FromResult(_countries.Remove(countryToRemove));
    }
}