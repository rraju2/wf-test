namespace YourProjectName.CQRS.Commands;

public record CreateCountryCommand(
    string Name,
    string IsoCode
);