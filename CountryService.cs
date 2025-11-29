using YourProjectName.CQRS.Commands;
using YourProjectName.CQRS.Queries;
using YourProjectName.Models;
using YourProjectName.Repositories;

namespace YourProjectName.Services;

public class CountryService(ICountryRepository countryRepository) : ICountryService
{
    public Task<IEnumerable<Country>> GetCountriesAsync()
    {
        return countryRepository.GetAllAsync();
    }

    public Task<Country?> GetCountryByIdAsync(GetCountryByIdQuery query)
    {
        return countryRepository.GetByIdAsync(query.Id);
    }

    public Task<Country> CreateCountryAsync(CreateCountryCommand command)
    {
        var country = new Country
        {
            Name = command.Name,
            IsoCode = command.IsoCode
        };
        return countryRepository.CreateAsync(country);
    }

    public Task<Country?> UpdateCountryAsync(UpdateCountryCommand command)
    {
        var country = new Country
        {
            Id = command.Id,
            Name = command.Name,
            IsoCode = command.IsoCode
        };
        return countryRepository.UpdateAsync(country);
    }

    public Task<bool> DeleteCountryAsync(DeleteCountryCommand command)
    {
        return countryRepository.DeleteAsync(command.Id);
    }
}