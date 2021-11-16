export class Geometry {
    type: string;
    coordinates: any; //non sappiamo se sarà un number[] (Point), number[][] (LineString) o number [][][] (Polygon)
}
export class GeoJson {
        public type: string;
        public geometry: Geometry;
        public properties?: any
}
export class GeoFeatureCollection
{
    public type: string;
    public features : GeoJson[];
}
