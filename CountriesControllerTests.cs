using Xunit;
using Moq;
using YourProjectName.Services;
using YourProjectName.Controllers;
using YourProjectName.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using YourProjectName.CQRS.Queries;
using YourProjectName.CQRS.Commands;

namespace YourProjectName.Tests;

public class CountriesControllerTests
{
    private readonly Mock<ICountryService> _mockCountryService;
    private readonly CountriesController _controller;

    public CountriesControllerTests()
    {
        _mockCountryService = new Mock<ICountryService>();
        _controller = new CountriesController(_mockCountryService.Object);
    }

    private static List<Country> GetTestCountries() =>
    [
        new() { Id = 1, Name = "United States", IsoCode = "USA" },
        new() { Id = 2, Name = "Canada", IsoCode = "CAN" }
    ];

    [Fact]
    public async Task GetCountries_ShouldReturnOkObjectResult_WithListOfCountries()
    {
        // Arrange
        var testCountries = GetTestCountries();
        _mockCountryService.Setup(s => s.GetCountriesAsync()).ReturnsAsync(testCountries);

        // Act
        var result = await _controller.GetCountries();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var countries = Assert.IsAssignableFrom<IEnumerable<Country>>(okResult.Value);
        Assert.Equal(2, countries.Count());
    }

    [Fact]
    public async Task GetCountryById_ExistingId_ShouldReturnOkObjectResult_WithCountry()
    {
        // Arrange
        var testCountry = GetTestCountries().First();
        _mockCountryService.Setup(s => s.GetCountryByIdAsync(It.IsAny<GetCountryByIdQuery>()))
            .ReturnsAsync(testCountry);

        // Act
        var result = await _controller.GetCountryById(testCountry.Id);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var country = Assert.IsType<Country>(okResult.Value);
        Assert.Equal(testCountry.Id, country.Id);
    }

    [Fact]
    public async Task GetCountryById_NonExistingId_ShouldReturnNotFound()
    {
        // Arrange
        _mockCountryService.Setup(s => s.GetCountryByIdAsync(It.IsAny<GetCountryByIdQuery>()))
            .ReturnsAsync((Country?)null);

        // Act
        var result = await _controller.GetCountryById(99);

        // Assert
        Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public async Task CreateCountry_ValidCommand_ShouldReturnCreatedAtAction()
    {
        // Arrange
        var createCommand = new CreateCountryCommand("Brazil", "BRA");
        var newCountry = new Country { Id = 3, Name = createCommand.Name, IsoCode = createCommand.IsoCode };
        _mockCountryService.Setup(s => s.CreateCountryAsync(createCommand)).ReturnsAsync(newCountry);

        // Act
        var result = await _controller.CreateCountry(createCommand);

        // Assert
        var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result);
        Assert.Equal(nameof(CountriesController.GetCountryById), createdAtActionResult.ActionName);
        Assert.Equal(newCountry.Id, createdAtActionResult.RouteValues?["id"]);
        Assert.Equal(newCountry, createdAtActionResult.Value);
    }

    [Fact]
    public async Task CreateCountry_InvalidModel_ShouldReturnBadRequest()
    {
        // Arrange
        _controller.ModelState.AddModelError("Name", "Required");
        var createCommand = new CreateCountryCommand("", "INVALID");

        // Act
        var result = await _controller.CreateCountry(createCommand);

        // Assert
        var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
        Assert.IsType<SerializableError>(badRequestResult.Value);
    }

    [Fact]
    public async Task UpdateCountry_ValidCommand_ShouldReturnOkObjectResult()
    {
        // Arrange
        var updateCommand = new UpdateCountryCommand(1, "United States of America", "USA");
        var updatedCountry = new Country { Id = 1, Name = "United States of America", IsoCode = "USA" };
        _mockCountryService.Setup(s => s.UpdateCountryAsync(updateCommand)).ReturnsAsync(updatedCountry);

        // Act
        var result = await _controller.UpdateCountry(updateCommand.Id, updateCommand);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(updatedCountry, okResult.Value);
    }

    [Fact]
    public async Task UpdateCountry_IdMismatch_ShouldReturnBadRequest()
    {
        // Arrange
        var updateCommand = new UpdateCountryCommand(1, "Name", "ISO");
        const int urlId = 2;

        // Act
        var result = await _controller.UpdateCountry(urlId, updateCommand);

        // Assert
        var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal("ID mismatch between URL and body.", badRequestResult.Value);
    }

    [Fact]
    public async Task UpdateCountry_NonExistingId_ShouldReturnNotFound()
    {
        // Arrange
        var updateCommand = new UpdateCountryCommand(99, "Non Existent", "NEX");
        _mockCountryService.Setup(s => s.UpdateCountryAsync(updateCommand)).ReturnsAsync((Country?)null);

        // Act
        var result = await _controller.UpdateCountry(updateCommand.Id, updateCommand);

        // Assert
        Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public async Task DeleteCountry_ExistingId_ShouldReturnNoContent()
    {
        // Arrange
        const int countryId = 1;
        _mockCountryService.Setup(s => s.DeleteCountryAsync(It.Is<DeleteCountryCommand>(c => c.Id == countryId)))
            .ReturnsAsync(true);

        // Act
        var result = await _controller.DeleteCountry(countryId);

        // Assert
        Assert.IsType<NoContentResult>(result);
    }

    [Fact]
    public async Task DeleteCountry_NonExistingId_ShouldReturnNotFound()
    {
        // Arrange
        const int countryId = 99;
        _mockCountryService.Setup(s => s.DeleteCountryAsync(It.Is<DeleteCountryCommand>(c => c.Id == countryId)))
            .ReturnsAsync(false);

        // Act
        var result = await _controller.DeleteCountry(countryId);

        // Assert
        Assert.IsType<NotFoundResult>(result);
    }
}