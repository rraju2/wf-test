using Microsoft.AspNetCore.Mvc;
using YourProjectName.CQRS.Commands;
using YourProjectName.CQRS.Queries;
using YourProjectName.Services;

namespace YourProjectName.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CountriesController(ICountryService countryService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetCountries()
    {
        var countries = await countryService.GetCountriesAsync();
        return Ok(countries);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetCountryById(int id)
    {
        var query = new GetCountryByIdQuery(id);
        var country = await countryService.GetCountryByIdAsync(query);

        return country is not null ? Ok(country) : NotFound();
    }

    [HttpPost]
    public async Task<IActionResult> CreateCountry([FromBody] CreateCountryCommand command)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var newCountry = await countryService.CreateCountryAsync(command);
        return CreatedAtAction(nameof(GetCountryById), new { id = newCountry.Id }, newCountry);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateCountry(int id, [FromBody] UpdateCountryCommand command)
    {
        if (id != command.Id)
        {
            return BadRequest("ID mismatch between URL and body.");
        }

        var updatedCountry = await countryService.UpdateCountryAsync(command);

        return updatedCountry is not null ? Ok(updatedCountry) : NotFound();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteCountry(int id)
    {
        var command = new DeleteCountryCommand(id);
        var success = await countryService.DeleteCountryAsync(command);

        if (!success)
        {
            return NotFound();
        }

        return NoContent();
    }
}