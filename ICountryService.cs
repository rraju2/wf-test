using YourProjectName.CQRS.Commands;
using YourProjectName.CQRS.Queries;
using YourProjectName.Models;

namespace YourProjectName.Services;

public interface ICountryService
{
    Task<IEnumerable<Country>> GetCountriesAsync();
    Task<Country?> GetCountryByIdAsync(GetCountryByIdQuery query);
    Task<Country> CreateCountryAsync(CreateCountryCommand command);
    Task<Country?> UpdateCountryAsync(UpdateCountryCommand command);
    Task<bool> DeleteCountryAsync(DeleteCountryCommand command);
}