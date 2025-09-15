'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ageGroups, genders, productCategories } from '@/lib/data';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { SlidersHorizontal } from 'lucide-react';
import { Slider } from './ui/slider';
import { useState } from 'react';

export function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <SlidersHorizontal className="h-5 w-5" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <Input id="search" placeholder="Search for clothes..." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select>
            <SelectTrigger id="category">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {productCategories.map((category) => (
                <SelectItem key={category} value={category.toLowerCase()}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="age">Age Group</Label>
          <Select>
            <SelectTrigger id="age">
              <SelectValue placeholder="All Ages" />
            </SelectTrigger>
            <SelectContent>
              {ageGroups.map((age) => (
                <SelectItem key={age} value={age.toLowerCase()}>
                  {age}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select>
            <SelectTrigger id="gender">
              <SelectValue placeholder="All Genders" />
            </SelectTrigger>
            <SelectContent>
              {genders.map((gender) => (
                <SelectItem key={gender} value={gender.toLowerCase()}>
                  {gender}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <Label>Price Range</Label>
                <span className="text-sm font-medium">R{priceRange[0]} - R{priceRange[1]}</span>
            </div>
            <Slider
                defaultValue={[500]}
                max={1000}
                step={10}
                onValueChange={(value) => setPriceRange(value)}
            />
        </div>
      </CardContent>
    </Card>
  );
}
