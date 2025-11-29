"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import { Check, ChevronsUpDown, LanguagesIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { useToast } from "@/components/ui/use-toast";

// --- 1. MOCK DATA (Replace with API calls) ---
const countries = [
    { label: "United States", value: "US" },
    { label: "Canada", value: "CA" },
    { label: "Germany", value: "DE" },
    { label: "Japan", value: "JP" },
    { label: "United Kingdom", value: "GB" },
    { label: "France", value: "FR" },
];

const sponsors = [
    { label: "MedTech Solutions", value: "medtech" },
    { label: "Pharma Innovations", value: "pharma-innov" },
    { label: "BioHealth Corp", value: "biohealth" },
];

const cros = [
    { label: "Global Research Org", value: "gro" },
    { label: "Clinical Trials Inc.", value: "cti" },
    { label: "Study Partners", value: "sp" },
];

const allLanguages = [
    { label: "English", value: "en" },
    { label: "Spanish", value: "es" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Japanese", value: "ja" },
];

// --- 2. VALIDATION SCHEMA ---
const formSchema = z.object({
    protocolName: z.string().min(5, "Protocol name must be at least 5 characters."),
    studyName: z.string().min(5, "Study name must be at least 5 characters."),
    country: z.string({ required_error: "Please select a country." }),
    siteName: z.string().min(3, "Site name is required."),
    customer: z.string().min(3, "Customer name is required."),
    cro: z.string().optional(), // CRO remains optional
    sponsor: z.string({ required_error: "Please select a sponsor." }),
    languages: z.array(z.string()).min(1, "At least one language must be selected."),
});

type FormValues = z.infer<typeof formSchema>;

// --- 3. ANIMATION VARIANTS ---
const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function ClinicalTrialForm() {
    const { toast } = useToast();
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            protocolName: "",
            studyName: "",
            siteName: "",
            customer: "",
            cro: "",
            sponsor: "",
            languages: [],
        },
    });

    function onSubmit(data: FormValues) {
        console.log("Form Submitted:", data);
        toast({
            title: "Study Creation Submitted!",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        });
    }

    return (
        <motion.div initial="hidden" animate="visible" variants={formVariants}>
            <Card className="w-full max-w-3xl">
                <CardHeader>
                    <CardTitle>Create New Clinical Study</CardTitle>
                    <CardDescription>
                        Fill in the details below to register a new protocol and study.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Protocol Name */}
                                <motion.div variants={itemVariants}>
                                    <FormField
                                        control={form.control}
                                        name="protocolName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Protocol Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g., PRO12345" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </motion.div>

                                {/* Study Name */}
                                <motion.div variants={itemVariants}>
                                    <FormField
                                        control={form.control}
                                        name="studyName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Study Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g., Phase III Efficacy Study" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </motion.div>

                                {/* Country (Combobox) */}
                                <motion.div variants={itemVariants}>
                                    <FormField
                                        control={form.control}
                                        name="country"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Country</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                className={cn(
                                                                    "w-full justify-between",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value
                                                                    ? countries.find(
                                                                        (country) => country.value === field.value
                                                                    )?.label
                                                                    : "Select country"}
                                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                                                        <Command>
                                                            <CommandInput placeholder="Search country..." />
                                                            <CommandEmpty>No country found.</CommandEmpty>
                                                            <CommandGroup>
                                                                <CommandList>
                                                                    {countries.map((country) => (
                                                                        <CommandItem
                                                                            value={country.label}
                                                                            key={country.value}
                                                                            onSelect={() => {
                                                                                form.setValue("country", country.value);
                                                                            }}
                                                                        >
                                                                            <Check
                                                                                className={cn(
                                                                                    "mr-2 h-4 w-4",
                                                                                    country.value === field.value
                                                                                        ? "opacity-100"
                                                                                        : "opacity-0"
                                                                                )}
                                                                            />
                                                                            {country.label}
                                                                        </CommandItem>
                                                                    ))}
                                                                </CommandList>
                                                            </CommandGroup>
                                                        </Command>
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </motion.div>

                                {/* Site Name */}
                                <motion.div variants={itemVariants}>
                                    <FormField
                                        control={form.control}
                                        name="siteName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Site Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g., General Hospital" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </motion.div>

                                {/* Customer */}
                                <motion.div variants={itemVariants}>
                                    <FormField
                                        control={form.control}
                                        name="customer"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Customer</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g., Pharma Inc." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </motion.div>

                                {/* CRO */}
                                <motion.div variants={itemVariants}>
                                    <FormField
                                        control={form.control}
                                        name="cro"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>CRO (Contract Research Organization)</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                className={cn(
                                                                    "w-full justify-between",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value
                                                                    ? cros.find(
                                                                        (cro) => cro.value === field.value
                                                                    )?.label
                                                                    : "Select CRO (optional)"}
                                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                                                        <Command>
                                                            <CommandInput placeholder="Search CRO..." />
                                                            <CommandEmpty>No CRO found.</CommandEmpty>
                                                            <CommandGroup>
                                                                <CommandList>
                                                                    {cros.map((cro) => (
                                                                        <CommandItem
                                                                            value={cro.label}
                                                                            key={cro.value}
                                                                            onSelect={() => {
                                                                                form.setValue("cro", cro.value);
                                                                            }}
                                                                        >
                                                                            <Check
                                                                                className={cn(
                                                                                    "mr-2 h-4 w-4",
                                                                                    cro.value === field.value
                                                                                        ? "opacity-100"
                                                                                        : "opacity-0"
                                                                                )}
                                                                            />
                                                                            {cro.label}
                                                                        </CommandItem>
                                                                    ))}
                                                                </CommandList>
                                                            </CommandGroup>
                                                        </Command>
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </motion.div>

                                {/* Sponsor */}
                                <motion.div variants={itemVariants}>
                                    <FormField
                                        control={form.control}
                                        name="sponsor"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Sponsor</FormLabel>
                                                <FormControl>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant="outline"
                                                                    role="combobox"
                                                                    className={cn(
                                                                        "w-full justify-between",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value
                                                                        ? sponsors.find(
                                                                            (sponsor) => sponsor.value === field.value
                                                                        )?.label
                                                                        : "Select sponsor"}
                                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                                                            <Command>
                                                                <CommandInput placeholder="Search sponsor..." />
                                                                <CommandEmpty>No sponsor found.</CommandEmpty>
                                                                <CommandGroup>
                                                                    <CommandList>
                                                                        {sponsors.map((sponsor) => (
                                                                            <CommandItem
                                                                                value={sponsor.label}
                                                                                key={sponsor.value}
                                                                                onSelect={() => {
                                                                                    form.setValue("sponsor", sponsor.value);
                                                                                }}
                                                                            >
                                                                                <Check
                                                                                    className={cn(
                                                                                        "mr-2 h-4 w-4",
                                                                                        sponsor.value === field.value
                                                                                            ? "opacity-100"
                                                                                            : "opacity-0"
                                                                                    )}
                                                                                />
                                                                                {sponsor.label}
                                                                            </CommandItem>
                                                                        ))}
                                                                    </CommandList>
                                                                </CommandGroup>
                                                            </Command>
                                                        </PopoverContent>
                                                    </Popover>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </motion.div>

                                {/* Languages (Multi-select) */}
                                <motion.div variants={itemVariants} className="md:col-span-2">
                                    <FormField
                                        control={form.control}
                                        name="languages"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Languages</FormLabel>
                                                {/* A real multi-select combobox is complex; this is a simplified UI */}
                                                <div className="flex flex-wrap gap-2 rounded-md border min-h-[40px] p-2">
                                                    {allLanguages
                                                        .filter((lang) => field.value.includes(lang.value))
                                                        .map((lang) => (
                                                            <span key={lang.value} className="bg-primary text-primary-foreground text-sm font-medium px-2 py-1 rounded-md">
                                                                {lang.label}
                                                            </span>
                                                        ))}
                                                </div>
                                                <FormDescription>
                                                    Select languages from the list below.
                                                </FormDescription>
                                                <div className="flex flex-wrap gap-2">
                                                    {allLanguages.map((lang) => (
                                                        <Button
                                                            type="button"
                                                            variant={field.value.includes(lang.value) ? "default" : "outline"}
                                                            key={lang.value}
                                                            onClick={() => {
                                                                const current = field.value;
                                                                const next = current.includes(lang.value)
                                                                    ? current.filter((v) => v !== lang.value)
                                                                    : [...current, lang.value];
                                                                field.onChange(next);
                                                            }}
                                                        >
                                                            {lang.label}
                                                        </Button>
                                                    ))}
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </motion.div>
                            </div>

                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button type="submit" className="w-full text-lg py-6">
                                    Create Study
                                </Button>
                            </motion.div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </motion.div>
    );
}