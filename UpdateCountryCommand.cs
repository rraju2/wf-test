namespace YourProjectName.CQRS.Commands;

public record UpdateCountryCommand(
    int Id,
    string Name,
    string IsoCode
);